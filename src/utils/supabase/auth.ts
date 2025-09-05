import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
 
if (!supabaseUrl || !supabaseAnonKey) { 
  throw new Error("Supabase URL and Anon Key are required. Make sure you have a .env.local file set up.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar_url?: string;
}

export const api = {
  async getProfile(): Promise<{ user: User | null; error: any }> {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return { user: null, error: sessionError };
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, avatar_url')
      .eq('id', session.user.id)
      .single();
    
    return { user: data ? { ...data, email: session.user.email } : null, error };
  },
};

export const useAuth = () => {
    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        const { user: profile, error: profileError } = await api.getProfile();
        if (profileError) throw profileError;
        return { user: profile, session: data.session };
      };

  const signUp = async (email: string, password: string, name: string) => {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                        name
                    )}`,
                },
            },
        });
        if (signUpError) throw signUpError;
        if (!signUpData.user) throw new Error("Sign up successful, but no user data returned.");

        // After sign up, the session is active. We can now fetch the profile
        // which should have been created by the database trigger.
        const { user: profile, error: profileError } = await api.getProfile();
        if (profileError || !profile) {
            console.error("Could not fetch profile immediately after sign up:", profileError);
            // Fallback to constructing a user object from the signup data
            return {
                user: {
                    id: signUpData.user.id,
                    name: signUpData.user.user_metadata.full_name,
                    email: signUpData.user.email,
                    avatar_url: signUpData.user.user_metadata.avatar_url,
                },
                session: signUpData.session,
            };
        }

        return { user: profile, session: signUpData.session };
    };  

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  };

  return { signIn, signUp, signOut, checkSession };
};
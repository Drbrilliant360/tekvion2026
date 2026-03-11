
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
// Note: These should be environment variables in a real application
const supabaseUrl = process.env.VITE_SUPABASE_URL || "YOUR_SUPABASE_URL_HERE";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY_HERE";
const supabase = createClient(supabaseUrl, supabaseKey);

const createAdmin = async () => {
  const email = "admin@tekvion.com";
  const password = "adminPassword123!";
  const fullName = "Admin User";

  try {
    // 1. Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError) {
      console.error("Error creating user:", authError.message);
      return;
    }

    if (!authData.user) {
        console.error("User creation failed, no user data returned.");
        return;
    }

    console.log("User created successfully:", authData.user.id);

    // 2. Assign admin role
    const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'admin' 
        });

    if (roleError) {
         console.error("Error assigning admin role:", roleError.message);
    } else {
        console.log("Admin role assigned successfully.");
    }

    console.log(`\nAdmin Credentials:\nEmail: ${email}\nPassword: ${password}`);

  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

createAdmin();

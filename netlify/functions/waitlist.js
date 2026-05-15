// netlify/functions/waitlist.js
// Receives email signups from the landing page form and saves them to Supabase.

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the incoming email from the form
    const { email, city_interest } = JSON.parse(event.body || '{}');

    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Please enter a valid email.' })
      };
    }

    // Connect to Supabase using environment variables
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Insert the new signup into the waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase().trim(),
          city_interest: city_interest || null,
          source: 'landing_page'
        }
      ])
      .select();

    // Handle duplicate emails gracefully
    if (error) {
      if (error.code === '23505') {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "You're already on the list! Skip's got you."
          })
        };
      }
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Something went wrong on our end.' })
      };
    }

    // Success
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Skip's got your back. Welcome to the detour.",
        data
      })
    };

  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unexpected error. Try again in a sec.' })
    };
  }
};

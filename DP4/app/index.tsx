import { Redirect } from 'expo-router';

// This is the root index page
// It automatically redirects users to the login page
export default function Index() {
  return <Redirect href="/login" />;
}


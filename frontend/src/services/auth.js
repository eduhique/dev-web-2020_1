/**
 * Checks if the user is logged in, based on a token presence.
 */
export default function isAuthenticated() {
  return localStorage.getItem("romaneioToken") !== null
}
const SUPABASE_URL = "https://lrzgcqoqcwicpuuuhaoj.supabase.co";
const SUPABASE_KEY = "sb_publishable_uunR3UQ9rttiK8dG85IedQ__Tn1duVK";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById("heroDays").textContent =
  daysBetween(MILESTONES.anniversary.date) + " 🎉";

const pushModal = document.getElementById("pushModal");
const dismissPushModal = document.getElementById("dismissPushModal");
const pushPersonButtons = document.querySelectorAll(".push-person-btn");

function maybeShowPushModal() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
  if (localStorage.getItem("pw_push_enabled") === "true") return;

  pushModal.classList.remove("hidden");
}

pushPersonButtons.forEach(button => {
  button.addEventListener("click", async () => {
    button.disabled = true;

    try {
      await subscribeToPush(supabaseClient, button.dataset.person);
      showToast("Push-Benachrichtigungen aktiviert 🔔", "success");
      pushModal.classList.add("hidden");
    } catch (error) {
      console.error("Fehler beim Aktivieren von Push:", error);
      showToast("Push-Benachrichtigungen konnten nicht aktiviert werden.", "error");
    } finally {
      button.disabled = false;
    }
  });
});

dismissPushModal.addEventListener("click", () => {
  pushModal.classList.add("hidden");
});

maybeShowPushModal();

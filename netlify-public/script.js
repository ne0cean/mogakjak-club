const form = document.querySelector("#survey-form");
const successMessage = document.querySelector("#success-message");
const rewriteButton = document.querySelector("#rewrite-button");
const errorMessage = document.querySelector("#form-error");

function getCheckedCount(name) {
  return form.querySelectorAll(`input[name="${name}"]:checked`).length;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function showSuccess() {
  localStorage.setItem("ai-mogakjak-submitted", "true");
  form.hidden = true;
  successMessage.hidden = false;
}

if (localStorage.getItem("ai-mogakjak-submitted") === "true") {
  showSuccess();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.hidden = true;

  const requiredGroups = ["tools[]", "goals[]", "firstSessionTopics[]"];
  if (requiredGroups.some((name) => getCheckedCount(name) === 0)) {
    showError("복수 선택 문항은 하나 이상 골라주세요.");
    return;
  }

  const submitButton = form.querySelector(".submit-button");
  submitButton.disabled = true;
  submitButton.textContent = "저장 중...";

  try {
    const formData = new FormData(form);
    const body = new URLSearchParams(formData).toString();
    const response = await fetch("/.netlify/functions/submit-survey", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      showError(result?.error || "응답을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.");
    } else {
      form.reset();
      showSuccess();
    }
  } catch {
    showError("응답을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "제출하기";
  }
});

rewriteButton.addEventListener("click", () => {
  localStorage.removeItem("ai-mogakjak-submitted");
  successMessage.hidden = true;
  form.hidden = false;
});


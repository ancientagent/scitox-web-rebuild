const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const tabs = document.querySelectorAll(".tab");
const productTitle = document.querySelector("#product-title");
const productCopy = document.querySelector("#product-copy");
const productStatus = document.querySelector("#product-status");
const productCta = document.querySelector("#product-cta");
const choices = document.querySelectorAll(".choice");
const routeTitle = document.querySelector("#route-title");
const routeCopy = document.querySelector("#route-copy");
const routeOwner = document.querySelector("#route-owner");
const routeReview = document.querySelector("#route-review");
const assistantRun = document.querySelector("#assistant-run");
const assistantStatus = document.querySelector("#assistant-status");
const drawer = document.querySelector("#demo-drawer");
const drawerClose = document.querySelector(".drawer-close");
let selectedRouteKey = "ready";

const productData = {
  standard: {
    title: "Standard Path",
    copy:
      "A clean product detail layout for the most common customer path. Final product specifics stay hidden until owner data and review are complete.",
    status: "Common self-service",
    cta: "Current purchase path pending review",
  },
  focused: {
    title: "Focused Path",
    copy:
      "A more specific product page pattern for customers who need clearer comparison without high-risk explanation or result language.",
    status: "Compare with support",
    cta: "Ask a product question",
  },
  complete: {
    title: "Complete Path",
    copy:
      "A comprehensive path for customers who should review facts, support notes, and policy links before choosing the next step.",
    status: "Review before purchase",
    cta: "Route to guidance first",
  },
};

const routeData = {
  ready: {
    title: "Common product path",
    copy:
      "Show product-path cards with restrained product facts, support links, and policy visibility.",
    owner: "Owner data: source-backed product mapping",
    review: "Review: product labels and guidance rules",
  },
  compare: {
    title: "Comparison path",
    copy:
      "Use approved comparison criteria and prompt support when the customer needs more context.",
    owner: "Owner data: source comparison rules",
    review: "Review: category exposure and claim limits",
  },
  specific: {
    title: "Human follow-up path",
    copy:
      "Route to support intake instead of forcing a product recommendation for a nuanced situation.",
    owner: "Owner data: escalation workflow",
    review: "Review: privacy notice and data handling",
  },
};

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const selected = productData[tab.dataset.product];
    productTitle.textContent = selected.title;
    productCopy.textContent = selected.copy;
    productStatus.textContent = selected.status;
    productCta.textContent = selected.cta;
  });
});

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const routeKey = choice.dataset.route;
    const selected = routeData[routeKey];
    if (!selected) {
      return;
    }

    choices.forEach((item) => item.classList.remove("active"));
    choice.classList.add("active");
    selectedRouteKey = routeKey;
    routeTitle.textContent = selected.title;
    routeCopy.textContent = selected.copy;
    routeOwner.textContent = selected.owner;
    routeReview.textContent = selected.review;
    resetAssistantStatus();
  });
});

assistantRun?.addEventListener("click", async () => {
  if (window.location.protocol === "file:") {
    assistantStatus.textContent =
      "Serve the demo with npm run serve:demo to call the backend guidance endpoint.";
    return;
  }

  const selected = routeData[selectedRouteKey];
  assistantRun.disabled = true;
  assistantStatus.textContent = "Checking the backend source-grounded guidance endpoint...";

  try {
    const response = await fetch("/api/guidance/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers: [
          {
            id: "selected_route",
            label: "Selected route",
            value: selectedRouteKey,
          },
          {
            id: "selected_route_label",
            label: "Selected route label",
            value: selected.title,
          },
        ],
      }),
    });

    const payload = await response.json();
    assistantStatus.textContent = `${payload.recommendation_status}: ${payload.explanation}`;
  } catch {
    assistantStatus.textContent =
      "The backend guidance endpoint could not be reached. Route to human support until configured.";
  } finally {
    assistantRun.disabled = false;
  }
});

function resetAssistantStatus() {
  if (!assistantStatus) {
    return;
  }

  assistantStatus.textContent =
    "The live endpoint uses backend source material. If product data or model credentials are missing, it escalates instead of inventing a recommendation.";
}

document.querySelectorAll("[data-open-drawer]").forEach((button) => {
  button.addEventListener("click", () => {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
  });
});

drawerClose?.addEventListener("click", () => {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
});

drawer?.addEventListener("click", (event) => {
  if (event.target === drawer) {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }
});

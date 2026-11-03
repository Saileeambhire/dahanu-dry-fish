import { siteConfig } from "@/config/site";

/**
 * Creates a formatted WhatsApp ordering link with custom message
 * @param {Object} params
 * @param {string} params.productName - Product name
 * @param {string} params.weight - Selected weight option (e.g., "500g")
 * @param {number} params.quantity - Quantity
 * @param {number} params.totalPrice - Computed total price in INR
 * @param {string} [params.customNote] - Optional extra note or request
 * @returns {string} wa.me URL
 */
export function buildProductWhatsAppUrl({
  productName,
  weight,
  quantity,
  totalPrice,
  customNote = "",
}) {
  const number = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");

  const lines = [
    "Hello! I want to order:",
    "",
    `Product: ${productName}`,
    `Weight: ${weight}`,
    `Quantity: ${quantity}`,
    `Price: ₹${totalPrice}`,
  ];

  if (customNote && customNote.trim().length > 0) {
    lines.push(`Note: ${customNote.trim()}`);
  }

  lines.push("");
  lines.push("Please share the availability and delivery details.");

  const messageText = lines.join("\n");
  const encoded = encodeURIComponent(messageText);

  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Creates a general inquiry WhatsApp URL
 * @param {string} [customMessage]
 * @returns {string} wa.me URL
 */
export function buildGeneralWhatsAppUrl(
  customMessage = "Hello! I am interested in ordering authentic Dahanu Dry Fish. Please share your latest available stock and price list."
) {
  const number = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(customMessage);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Formats an amount into Indian Rupee format (e.g. ₹400)
 * @param {number} amount
 * @returns {string}
 */
export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}


function getImageForTopic(topic = "") {
  const lower = topic.toLowerCase();

  if (lower.includes("web") || lower.includes("full stack")) {
    return "/fullstack.jpg";
  } else if (lower.includes("react")) {
    return "/react.jpg";
  } else if (lower.includes("node") || lower.includes("backend")) {
    return "/node.jpg";
  } else if (lower.includes("design")) {
    return "/design.jpg";
  } else if (lower.includes("ai") || lower.includes("machine")) {
    return "/ai.jpg";
  } else if (lower.includes("business")) {
    return "/business.jpg";
  }

  return "/default.jpg";
}
module.exports = getImageForTopic;
const protocolAutoPrefix = (link: string) => {
  if (link.startsWith("http://") || link.startsWith("https://")) return link;
  // http will auto redirect to https if available
  return `http://${link}`;
};

export default protocolAutoPrefix;
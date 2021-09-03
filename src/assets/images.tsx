import CyberPunk from './CyberPunk.jpeg';

interface imageInterface {
  id: number;
  name: string;
  credit: string;
  url: string;
}


const images: imageInterface[] = [
  {
    id: 1,
    name: "cyberpunk",
    credit: `Photo by <a class="underline" href="https://unsplash.com/@kxvn_lx?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">kevin laminto</a> on <a class="underline" href="https://unsplash.com/s/photos/cyberpunk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    `,
    url: CyberPunk,
  },
];

export default images;
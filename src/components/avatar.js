import Image from 'next/image';

export const Avatar = ({ src }) => {
  return (
    <div className="h-16 w-16 rounded-full border-sm border-black shadow-solid">
      <div className="relative h-full w-full overflow-hidden rounded-full border-[0.1875rem] border-white bg-cyan">
        <Image src={src} layout="fill" className="grayscale" alt="" />
      </div>
    </div>
  );
};

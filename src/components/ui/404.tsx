import Image from "next/image";

export default function NotFound({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <Image
          src="/404.svg" // Replace with your actual image path
          alt="Not Found"
          layout="responsive"
          width={900}
          height={900}
          className="object-contain"
        />
      <h1 className="text-3xl font-bold mt-6">{message}</h1>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  );
}
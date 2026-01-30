type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className = "", ...props }: ButtonProps) => (
  <button
    {...props}
    className={`border border-black p-2 rounded-lg cursor-pointer
      transition-all duration-300 ease-out
      hover:bg-amber-200
      disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300
      disabled:cursor-not-allowed disabled:hover:bg-gray-200
      ${className}`}
  />
);

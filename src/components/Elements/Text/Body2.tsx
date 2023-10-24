interface Props extends React.HTMLProps<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const Body2 = ({ children, className = "", ...props }: Props) => {
  return (
    <span {...props} className={`text-sm font-bold ${className}`}>
      {children}
    </span>
  );
};

export default Body2;

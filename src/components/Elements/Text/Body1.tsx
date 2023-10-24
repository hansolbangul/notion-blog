interface Props extends React.HTMLProps<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const Body1 = ({ children, className = "", ...props }: Props) => {
  return (
    <span {...props} className={`text-base font-bold ${className}`}>
      {children}
    </span>
  );
};

export default Body1;

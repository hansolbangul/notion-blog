interface Props extends React.HTMLProps<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const Body3 = ({ children, className = "", ...props }: Props) => {
  return (
    <span {...props} className={`text-xs font-bold ${className}`}>
      {children}
    </span>
  );
};

export default Body3;

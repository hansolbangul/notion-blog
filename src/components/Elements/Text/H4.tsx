interface Props extends React.HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

const H4 = ({ children, className = "", ...props }: Props) => {
  return (
    <h4 {...props} className={`text-base md:text-xl font-bold ${className}`}>
      {children}
    </h4>
  );
};

export default H4;

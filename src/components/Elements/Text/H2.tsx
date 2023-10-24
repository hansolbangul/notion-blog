interface Props extends React.HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

const H2 = ({ children, className = "", ...props }: Props) => {
  return (
    <h2 {...props} className={`text-xl md:text-3xl font-bold ${className}`}>
      {children}
    </h2>
  );
};

export default H2;

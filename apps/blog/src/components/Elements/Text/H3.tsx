interface Props extends React.HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

const H3 = ({ children, className = "", ...props }: Props) => {
  return (
    <h3 {...props} className={`text-lg md:text-2xl font-bold ${className}`}>
      {children}
    </h3>
  );
};

export default H3;

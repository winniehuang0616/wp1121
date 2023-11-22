type Props = {
  children: React.ReactNode;
};

function DocEditorLayout({ children }: Props) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}

export default DocEditorLayout;

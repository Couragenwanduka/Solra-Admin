const LogoSolra = () => {
  return (
    <main
      className="flex font-sora font-bold text-2xl gap-1 items-center cursor-default">
      <div className="transform hover:animate-spin duration-1000">
        <img src="/icons/solraLogo.svg" alt="Solra logo" className="w-[30px] h-[30px]" />
      </div>
      <h1>Solra</h1>
    </main>
  );
};

export default LogoSolra;

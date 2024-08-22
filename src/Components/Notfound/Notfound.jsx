import notFoundImg from "../../assets/imgs/error.svg";
function Notfound() {
  return (
    <div className="">
      <img src={notFoundImg} alt="Not found" className="w-full" />
    </div>
  );
}

export default Notfound;

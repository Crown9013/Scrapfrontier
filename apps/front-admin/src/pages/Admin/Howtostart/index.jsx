import { useEffect, useState, useCallback } from "react";
import { useHowtostart } from "./hooks/useHowtostart";
import Spoiler from "./components/Spoiler";
import DetailedHowtostartModal from "./components/DetailedHowtostartModal";

const Howtostart = () => {
  const { getAllHowtostart, total } = useHowtostart();
  const [howtostartItems, setHowtostartItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isShowMore, setIsShowMore] = useState(true);
  const [limit, setLimit] = useState(5);

  const showMore = async () => {
    setLimit((prev) => prev + 5);
  };

  const refresh = useCallback(async () => {
    setHowtostartItems(await getAllHowtostart(limit));
  }, [getAllHowtostart, limit]);

  useEffect(() => {
    document.title = "Admin | Howtostart";
  });

  useEffect(() => {
    refresh();
  }, [limit, refresh]);

  useEffect(()=> {
    if (total > limit) {
        setIsShowMore(true);
      } else {
        setIsShowMore(false);
      }
  }, [total, limit])

  return (
    <div>
      <main className="content">
        <div className="main admin-main">
          <div className="main_container">
            <div className="main__content">
              <h1 className="text-center text120">How to start</h1>
            </div>
          </div>
        </div>
      </main>
      <div className="main_container">
        <div>
          <button className="block bg-[#CC402A] ml-auto uppercase p-2 mt-5" onClick={()=>setOpenModal(true)}>
            Add New
          </button>
        </div>
        <div>
          {howtostartItems?.map((item, index) => (
            <Spoiler data={item} refresh={refresh} key={index}/>
          ))}
          {isShowMore && (
            <button
              className="flex justify-center items-center bg-[#CC402A] m-auto uppercase p-2 mt-5"
              onClick={() => showMore()}
            >
              Show More
            </button>
          )}
        </div>
        {openModal && (
          <DetailedHowtostartModal
            row={null}
            refresh={refresh}
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Howtostart;

import { useEffect, useState, useCallback } from "react";
import { useSupport } from "./hooks/useSupport";
import Spoiler from "./components/Spoiler";
import DetailedSupportModal from "./components/DetailedSupportModal";

const Support = () => {
  const { getAllSupport, total } = useSupport();
  const [supportItems, setSupportItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isShowMore, setIsShowMore] = useState(true);
  const [limit, setLimit] = useState(5);

  const showMore = async () => {
    setLimit((prev) => prev + 5);
  };

  const refresh = useCallback(async () => {
    setSupportItems(await getAllSupport(limit));
  }, [getAllSupport, limit]);

  useEffect(() => {
    document.title = "Admin | Support";
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
              <h1 className="text-center text120">Support</h1>
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
          {supportItems?.map((item, index) => (
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
          <DetailedSupportModal
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

export default Support;

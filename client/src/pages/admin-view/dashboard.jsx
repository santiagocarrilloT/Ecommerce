import ProductImageLoad from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadImagenUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadImagenUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadImageUrl("");
        toast({
          title: "Imagen agregada correctamente",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  //console.log(featureImageList, "featureImageList");

  return (
    <div>
      <ProductImageLoad
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadImagenUrl={uploadImagenUrl}
        setUploadImageUrl={setUploadImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        //isEditMode={currentEditedId !== null}
      ></ProductImageLoad>
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImageItem) => (
              <div className="relative">
                <img
                  src={featureImageItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
export default AdminDashboard;

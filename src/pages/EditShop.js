import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import ShopAddAddress from "../components/ShopAddAddress";
import ShopAddFlavors from "../components/ShopAddFlavors";
import ShopAddMap from "../components/ShopAddMap";
import ShopAddName from "../components/ShopAddName";
import ShopAddOpeningHours from "../components/ShopAddOpeningHours";
import ShopAddSummary from "../components/ShopAddSummary";
import { useUser } from "../context/UserContext";
import { GetShopById, UpdateShopById } from "../services/shop";
import { GetUser } from "../services/user";

const EditShop = () => {
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const params = useParams();

  const styleTime = (h, m) => {
    if (h <= 9) h = `0${h}`;
    if (m <= 9) m = `0${m}`;

    return `${h}:${m}`;
  };

  const handleUpdateShop = async () => {
    setLoading(true);
    const res = await UpdateShopById(params.id, formData);
    if (res.status) {
      console.log(res.content);

      const userData = await GetUser();
      user.setUser(await userData.content);

      navigate(`/shop/${res.content._id}`);
      return;
    }
    setError(res.message);
    setLoading(false);
    console.log(res.message);
  };

  useEffect(() => {
    const populateShop = async (id) => {
      setFormData(await GetShopById(id));
    };

    setLoading(true);
    populateShop(params.id);
    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  if (loading)
    return (
      <div className="flex-row full-width flex-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );

  if (!formData) return null;
  switch (step) {
    case 1: {
      return (
        <ShopAddName
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        />
      );
      break;
    }
    case 2: {
      return (
        <ShopAddAddress
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        />
      );
      break;
    }
    case 3: {
      return (
        <ShopAddMap
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        />
      );
      break;
    }
    case 4: {
      return (
        <ShopAddOpeningHours
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
          styleTime={styleTime}
        />
      );
      break;
    }
    case 5: {
      return (
        <ShopAddFlavors
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
          styleTime={styleTime}
        />
      );
      break;
    }
    case 6: {
      return (
        <>
          <ShopAddSummary
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            styleTime={styleTime}
            error={error}
            setError={setError}
            handleCreateShop={handleUpdateShop}
          />
        </>
      );
      break;
    }
    default: {
      return "default";
      break;
    }
  }
};

export default EditShop;

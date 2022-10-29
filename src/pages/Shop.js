// Hooks
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import { getShop } from "../services/shopService";
import {
  Container,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardHeader,
  CardContent,
  Button,
} from "@mui/material";

// Icons
import { CiIceCream } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { CiMapPin } from "react-icons/ci";

const Shop = () => {
  const [shop, setShop] = useState();
  const [shopDataHelperText, setShopDataHelperText] = useState("");
  const [shopOk, setShopOk] = useState(false);

  const params = useParams();

  useEffect(() => {
    getShop(params.id)
      .then((response) => {
        setShop(response.data.content);
        setShopOk(true);
        console.log(response.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  if (shopOk) {
    return (
      <Card className="card">
        <CardHeader
          className="card-header"
          title={
            <div className="flex-row">
              <Typography variant="h4">
                <CiIceCream />
              </Typography>
              <Typography variant="h5">{shop.name}</Typography>
            </div>
          }
          subheader={
            <div className="flex-row">
              <Typography variant="h4">
                <CiMapPin />
              </Typography>
              <Typography variant="h6">
                {shop.address.streetName} {shop.address.streetNumber}
                {", "}
                {shop.address.postCode} {shop.address.city}{" "}
                {shop.address.country}
              </Typography>
            </div>
          }
          // action={

          // }
        />
        <CardContent className="card-content">
          <div className="flex-column">
            <Card className="card">
              <CardHeader className="card-header" title="Smaki do wyboru" />
              <CardContent className="card-content">
                <Grid container>
                  {shop.flavors.map((flavor, i) => (
                    <Grid item xs={12} sm={6} md={4}>
                      <FormGroup key={i}>
                        <FormControlLabel
                          disabled
                          control={
                            <Checkbox defaultChecked={flavor.available} />
                          }
                          label={flavor.name}
                        />
                      </FormGroup>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <div>fuckup</div>;
};

export default Shop;

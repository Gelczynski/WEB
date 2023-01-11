import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ShopEmployeeAdd from "../components/ShopEmployeeAdd";
import { useTheme } from "../context/ThemeContext";
import { GetShopById } from "../services/shop";

const ShopEmployee = () => {
  const isMobile = useTheme().getIsMobile();
  const [shop, setShop] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const [changed, setChanged] = useState([]);
  const params = useParams();

  const populateShop = async () => {
    setLoading(true);
    const shopData = await GetShopById(params.id);
    if (!shopData.status) {
      setError(shopData.message);
      setLoading(false);
      return;
    }
    setShop(shopData.content);
    setLoading(false);
    return;
  };

  const handleUpdateEmployee = (e, employee) => {
    e.preventDefault();
    let arr = shop.employees;
    let index = findIndexByEmail(arr, employee.email);
    if (index < 0) return;
    const updateEmployee = arr[index];
    // update employee

    arr = changed;
    index = arr.indexOf(employee.email);
    if (index < 0) return;
    arr.splice(index, 1);
    setChanged(arr);

    populateShop();
  };

  const handleJobPositionChange = (e, employee) => {
    e.preventDefault();
    const arr = shop.employees;
    const index = findIndexByEmail(arr, employee.email);
    if (index < 0) return;
    arr[index].jobPosition = e.target.value;
    setShop({ ...shop, employees: arr });
    if (!changed.includes(employee.email)) {
      setChanged([...changed, employee.email]);
    }
  };

  const handleDeleteEmployee = (e, employee) => {
    e.preventDefault();
    const arr = shop.employees;
    const index = findIndexByEmail(arr, employee.email);
    if (index < 0) return;
    const deleteEmployee = arr[index];
    // delete employee

    populateShop();
  };

  const findIndexByEmail = (arr, email) => {
    return arr.findIndex((obj) => obj.email === email);
  };

  useEffect(() => {
    setError("");
    setLoading(true);
    populateShop();
  }, []);

  if (loading) return <Loading />;
  return (
    <Card className="card">
      <CardHeader
        className="card-header"
        title={`Pracownicy lodziarni ${shop.name}`}
      />
      <CardContent className="card-content">
        {error && <div className="error">{error}</div>}
        <ShopEmployeeAdd
          shop={shop}
          setShop={setShop}
          setChanged={setChanged}
          populateShop={populateShop}
        />
        {shop.employees &&
          shop.employees
            .map((employee) => (
              <>
                <Container>
                  <div
                    key={employee.email}
                    className={
                      isMobile
                        ? "flex-column flex-space-between flex-center"
                        : "flex-row flex-space-between flex-center"
                    }
                  >
                    <TextField
                      fullWidth
                      type="text"
                      id="email"
                      value={employee.email}
                      disabled
                    />
                    <FormControl fullWidth>
                      <InputLabel id="job-position-label">
                        Stanowisko
                      </InputLabel>
                      <Select
                        labelId="job-position-label"
                        id="job-position"
                        value={employee.jobPosition}
                        label="Stanowisko"
                        onChange={(e) => {
                          handleJobPositionChange(e, employee);
                        }}
                      >
                        <MenuItem value={"owner"}>Właściciel</MenuItem>
                        <MenuItem value={"employee"}>Pracownik</MenuItem>
                      </Select>
                    </FormControl>
                    <div>
                      <div className="flex-row flex-space-between">
                        <Button
                          variant="contained"
                          disabled={!changed.includes(employee.email)}
                          onClick={(e) => {
                            handleUpdateEmployee(e, employee);
                          }}
                        >
                          Aktualizuj
                        </Button>
                        <IconButton
                          onClick={(e) => {
                            handleDeleteEmployee(e, employee);
                          }}
                        >
                          <CiTrash />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </Container>
                <Divider
                  style={{
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                  }}
                />
              </>
            ))
            .reverse()}
      </CardContent>
    </Card>
  );
};

export default ShopEmployee;

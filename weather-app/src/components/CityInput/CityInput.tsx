import { useEffect, useState } from "react";
import { UseCityList } from "../../api/CityName";
import { CitySearchList } from "../CitySearchList/CitySearchList";
import "./CityInput.css";




export const CityInput = () => {

    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const url = query.trim()
        ? `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
        : "";

    const { state } = UseCityList(url);

    useEffect(() => {
        if (!query.trim()) return;

        if (state.status === "success") {
            console.log("Нашли города:", state.data?.results);
        }

        if (state.status === "error") {
            console.log("Ошибка запроса:", state.error);
        }

    }, [state, query]);

    return (

        <div className="city-search flex">
            <input
                type="text"
                placeholder="Search for a place"
                className="city-search__input"
                value={query}
                onChange={handleChange}
            />
            {query.trim() !== "" && state.data && (
                <CitySearchList
                    cityList={state.data}
                    onSelect={() => setQuery("")}
                />
            )}
        </div>

    );
};



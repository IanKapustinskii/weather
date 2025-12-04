import { type FC } from "react";
import type { CityList } from "../../api/CityName";
import { useUnits } from "../UnitsProvider/UnitsProvider";


export interface CityListSearchProps {
    cityList: CityList,
    onSelect: () => void;
}

export const CitySearchList: FC<CityListSearchProps> = ({ cityList, onSelect }) => {
    const { updateUnits } = useUnits();

    return (
        <ul className="city__list list-reset flex" tabIndex={-1}>
            {
                cityList.results.map((city) => (
                    <li
                        key={city.id}
                        className="city__item"
                        onClick={() => {
                            updateUnits({ city: city.id })
                            onSelect();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                updateUnits({ city: city.id });
                                onSelect();
                            }
                        }}
                        tabIndex={0}
                    >
                        <h2 className="title city__name">
                            {city.name} {city.admin1} {city.country}
                        </h2>
                    </li>
                ))
            }
        </ul>
    );
}
import Select, { type GroupBase, type OnChangeValue, components } from "react-select";
import { useUnits, type Units } from "../UnitsProvider/UnitsProvider";
import './Selector.css';
import { useRef } from "react";


type Option = {
    value: string;
    label: string;
    field: keyof Units;
};

type Group = GroupBase<Option>;

const groupedOptions: Group[] = [
    {
        label: "Temperature",
        options: [
            { value: "celsius", label: "Celsius (°C)", field: "temperature" },
            { value: "fahrenheit", label: "Fahrenheit (°F)", field: "temperature" },
        ],
    },
    {
        label: "Wind",
        options: [
            { value: "kmh", label: "km/h", field: "wind" },
            { value: "mph", label: "mph", field: "wind" },
        ],
    },
    {
        label: "Precipitation",
        options: [
            { value: "mm", label: "mm", field: "precipitation" },
            { value: "inch", label: "inch", field: "precipitation" },
        ],
    },
    {
        label: "Time",
        options: [
            { value: "24", label: "24H", field: "time" },
            { value: "12", label: "12H", field: "time" },
        ]
    }
];

export const UnitSelector = () => {
    const { units, updateUnits, toggleUnits } = useUnits();
    const selectRef = useRef<any>(null);

    const getCurrentSelected = () => {
        const allOptions = groupedOptions.flatMap(g => g.options);
        return allOptions.filter(opt => units[opt.field] === opt.value);
    };

    const handleChange = (selected: OnChangeValue<Option, false>) => {
        if (!selected) return;

        const { field, value } = selected;
        updateUnits({ [field]: value } as Partial<Units>);
    };

    const btnText = () => {
        if (units.temperature === "celsius" || units.precipitation === "mm" || units.time === "24" || units.wind === "kmh") {
            return "Switch to imperial"
        } else {
            return "Switch to metric"
        }
    }

    const MenuList = (props: any) => {

        return (
            <components.MenuList {...props}>
                <button

                    tabIndex={0}
                    onClick={toggleUnits}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && selectRef.current) {
                            toggleUnits();
                        }
                    }}
                    className="btn-reset select__btn"
                >
                    {btnText()}
                </button>
                {props.children}
            </components.MenuList>
        )
    };

    return (
        <Select
            styles={{
                control: (base, state) => ({
                    ...base,
                    outline: state.isFocused ? '5px solid var(--hover)' : 'none',
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                        ? 'var(--hover)'
                        : state.isFocused
                            ? 'rgb(53, 50, 50)'
                            : 'var(--element-body)',
                    color: state.isFocused ? 'var(--text)' : "var(--text)",
                }),
            }}
            ref={selectRef}
            className="custom-select"
            classNamePrefix="react-select"
            options={groupedOptions}
            value={getCurrentSelected()}
            onChange={handleChange}
            isSearchable={false}
            isClearable={false}
            closeMenuOnSelect={false}
            onKeyDown={(e) => {
                if (e.key === "Enter" && selectRef.current) {
                    e.preventDefault();
                    selectRef.current.onMenuOpen();
                }
            }}
            isMulti={false}
            components={{
                MenuList,
                SingleValue: () => (
                    <div className="selector__placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#fff" d="M14.125 7.406c.031.407.031.813 0 1.188l1 .594a.74.74 0 0 1 .344.843c-.344 1.313-1.063 2.5-2 3.469-.25.219-.625.281-.906.125l-1-.594c-.25.188-.72.469-1.032.594v1.156a.733.733 0 0 1-.562.719A7.765 7.765 0 0 1 6 15.5c-.313-.063-.563-.406-.563-.719v-1.156a5.54 5.54 0 0 1-1.03-.594l-1 .594c-.282.156-.657.094-.907-.125-.938-.969-1.656-2.156-2-3.469a.74.74 0 0 1 .344-.844l1-.593c-.032-.156-.032-.406-.032-.594 0-.156 0-.406.032-.594l-1-.562A.74.74 0 0 1 .5 6c.344-1.313 1.063-2.5 2-3.469.25-.219.625-.281.906-.125l1 .594c.25-.188.719-.469 1.032-.594V1.25c0-.344.218-.625.562-.719a7.766 7.766 0 0 1 3.969 0c.312.063.562.406.562.719v1.156c.313.125.781.406 1.031.594l1-.594c.282-.156.657-.094.907.125.937.969 1.656 2.156 2 3.469a.74.74 0 0 1-.344.844l-1 .562Zm-1.656 2c.25-1.312.25-1.469 0-2.781l1.375-.781c-.188-.563-.688-1.375-1.063-1.813l-1.375.782c-.969-.844-1.125-.938-2.375-1.375V1.843C8.75 1.812 8.281 1.75 8 1.75c-.313 0-.781.063-1.063.094v1.593c-1.25.438-1.375.532-2.375 1.376L3.188 4.03c-.468.532-.812 1.157-1.062 1.813l1.375.781c-.25 1.313-.25 1.469 0 2.781l-1.375.781c.188.563.688 1.376 1.063 1.813l1.374-.781c.97.844 1.125.937 2.375 1.375v1.594c.282.03.75.093 1.063.093.281 0 .75-.062 1.031-.094v-1.593c1.25-.438 1.375-.531 2.375-1.375l1.375.781c.375-.438.875-1.25 1.063-1.813l-1.375-.78ZM8 5c1.625 0 3 1.375 3 3 0 1.656-1.375 3-3 3a3 3 0 0 1-3-3c0-1.625 1.344-3 3-3Zm0 4.5A1.5 1.5 0 0 0 9.5 8c0-.813-.688-1.5-1.5-1.5A1.5 1.5 0 0 0 6.5 8c0 .844.656 1.5 1.5 1.5Z" /></svg>
                        <span> Units</span>
                    </div>
                ),
                Placeholder: () => null,
                IndicatorSeparator: () => null,
            }
            }
            placeholder=""
        />
    );
};

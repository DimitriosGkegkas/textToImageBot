import { Select } from "antd";

const Option = Select.Option;

const filters = (changeFilter, filter, tags = []) => {
  return [
    <Select
      mode="multiple"
      onChange={(value) => changeFilter("preferences", value)}
      style={{ width: "100%" }}
      value={filter.preferences}
      placeholder="Επιλογή Παιχνιδιού"
    >
      <Option key="0" value="all">
        Όλοι
      </Option>
      {tags.map((tag, index) => (
        <Option key={index} value={tag.key}>
          {tag.name}
        </Option>
      ))}
    </Select>,
  ];
};

export default filters;

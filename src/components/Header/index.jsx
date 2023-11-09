import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Header = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div>
      <Search
        // addonBefore="https://"
        placeholder="input search text"
        // allowClear
        onSearch={onSearch}
        style={{
          width: 304,
        }}
      />
    </div>
  );
};

export default Header;

import React, {FC} from 'react';
import {Tabs, Tab, styled, TextField} from "@mui/material";
import {indigo, red} from "@mui/material/colors";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabCss = styled(Tab)({
    '&.Mui-selected': {
        color: indigo[500],
        borderColor: indigo[500],
    },

});

const TabsCss = styled(Tabs)({
    '&.MuiTabs-root': {
        '.MuiTabs-scroller':{
            backGround: indigo[500],
            '.MuiTabs-indicator': {
                backgroundColor: indigo[500],
                width: '50px'
            }

        }
    },
    // backGround: indigo[500],
});

const TabsMainPage: FC = () => {

    const [value, setValue] = React.useState(0);

    console.log( '✅: ', value )


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <TabsCss  value={value} onChange={handleChange} aria-label="basic tabs example" >
                <TabCss label="Item One" {...a11yProps(0)} />
                <TabCss label="Item Two" {...a11yProps(1)} />
                <TabCss label="Item Three" {...a11yProps(2)} />
            </TabsCss>
        </>
    );
};

export default TabsMainPage;

import { useState } from 'react';
import { SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { CustomDiv } from "../../Components/CustomElements"
import { DragIndicator } from "@mui/icons-material";
import { useDrag } from "react-dnd";
import { FieldType } from "../../Components/FormEngine/types";
import React from 'react';
import { FormBuilderContext, FormBuilderContextType } from '../../State/FormBuilder';


type DragableFieldProps = {
    muiIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    label: string
    callback: React.Dispatch<React.SetStateAction<boolean>>,
    type: FieldType
}

export const DragableField = (props: DragableFieldProps) => {
    const { muiIcon: MuiIcon, label, type, callback } = props;
    const [isHovering, setIsHovering] = useState(false);
    const { forms } = React.useContext(FormBuilderContext) as FormBuilderContextType

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "field",
        item: { type: type },
        collect: (monitor) => ({

            isDragging: !!monitor.isDragging(),
        }),
    }));

    React.useEffect(() => {
        if (isDragging && !forms.length) callback(true)

    }
        , [isDragging])
    return (

        <CustomDiv
            // noBorder={true}

            style={{ display:'flex', borderColor: isHovering ? "#6564DB" : 'grey', gap:'10px',paddingLeft: '10px', borderRadius: '5px', width:'100%'  }}
            isDragging={isDragging}
            ref={drag}
            highlightColor="#6564DB"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)} key={label.concat('customdiv')} dashed={true}  >
            <Typography key={label.concat('typography')} style={{ fontSize:'0.75em', color: isDragging ? '#0268d1' : (isHovering ? "#6564DB" : 'grey') }}>{label} </Typography>
            {isHovering ? <DragIndicator style={{ color: isDragging ? '#0268d1' : (isHovering ? "#6564DB" : 'grey') }} /> : <MuiIcon key={label.concat('customdiv')} style={{ fontSize:'0.75em',color: 'grey' }} />}

        </CustomDiv>

    )
}
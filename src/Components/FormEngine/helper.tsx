import { FieldDef, FieldType, FormStyling } from "./types"

export const getStyling = (index: { category?: string, id?: string, fieldType?: FieldType, styling: FormStyling[] }) => {
    let styling = {} as React.CSSProperties
    index.styling.forEach((style) => {
        style.categoryStyling ? (style.categoryStyling.includes(index.category ?? '') ? styling = { ...styling, ...style.style } : null) : null  // targets category
        style.id ? (style.id === index.id ? styling = { ...styling, ...style.style } : null) : null // targets individual components
        style.fieldType ? (style.fieldType === index.fieldType ? styling = { ...styling, ...style.style } : null) : null // targets field type (text, checkbox, etc
    })

    return styling
}

type CategoryData = { [key: string]: FieldDef[] }

function repositionMultiLineText(jsonData: CategoryData[]): CategoryData[] {
    return jsonData.map(categoryData => {
        const updatedCategoryData: CategoryData = {};
        let hasMultiLineText = false;

        Object.keys(categoryData).forEach(categoryKey => {
            const fields = categoryData[categoryKey];
            const multiLineTextFields = fields.filter(field => field.fieldType === "multi-line-text");
            const otherFields = fields.filter(field => field.fieldType !== "multi-line-text");

            if (multiLineTextFields.length > 0) {
                hasMultiLineText = true;
                updatedCategoryData[categoryKey] = [...otherFields, ...multiLineTextFields];
            } else {
                updatedCategoryData[categoryKey] = fields;
            }
        });

        if (!hasMultiLineText) {
            return categoryData;
        }

        return updatedCategoryData;
    });
}
export const getCategorizedFields = (formDef: FieldDef[]) => {
    let cat: string[] = []
    formDef.forEach((field) => {
        if (!cat.includes(field.category)) {
            cat.push(field.category)
        }
    })
    let categorizedFields: CategoryData = {}
    cat.forEach((category) => {
        categorizedFields[category] = []
    })
    formDef.forEach((field) => {
        categorizedFields[field.category].push(field)
    })
    //convert object to array
    let categorizedFieldsArray: { [key: string]: FieldDef[] }[] = []
    for (let key in categorizedFields) {
        const categoryFields = categorizedFields[key];
        categorizedFieldsArray.push({ [key]: categoryFields });
    }
    return repositionMultiLineText(categorizedFieldsArray)
}
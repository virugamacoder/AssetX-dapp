import TextInput from "components/Forms/textInput";
import moment from "moment";

function ListSTOTimeline(props) {
    const { formik } = props


    return (
        <div className="flex flex-col gap-[1.5rem] w-full">
            <div className="flex w-full gap-[1.5rem]">
                <div className="w-1/2">
                    <TextInput
                        type={"dateTime"}
                        label="Start Time"
                        name="startTime"
                        onChange={(e) => {
                            let value = e?.target?.value === "" ? "" : e?.target?.value;
                            let timeStamp = moment(value).unix()
                            formik.setFieldValue("startTime", value);
                            formik.setFieldValue("startTimeTimestamp", timeStamp);
                        }}
                        min={moment().format("YYYY-MM-DDTHH:mm")}
                        onBlur={formik.handleBlur}
                        value={formik.values.startTime}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        type={"dateTime"}
                        label="End Time"
                        name="endTime"
                        onChange={(e) => {
                            let value = e?.target?.value === "" ? "" : e?.target?.value;
                            let timeStamp = moment(value).unix()
                            formik.setFieldValue("endTime", value);
                            formik.setFieldValue("endTimeTimestamp", timeStamp);
                        }}
                        min={moment(formik.values.startTime).format("YYYY-MM-DDTHH:mm")}
                        onBlur={formik.handleBlur}
                        value={formik.values.endTime}
                    />
                </div>
            </div>
            <div className="flex w-full">
                <TextInput
                    type={"dateTime"}
                    label="Token Claim Time"
                    name="tokenClaimTime"
                    onChange={(e) => {
                        let value = e?.target?.value === "" ? "" : e?.target?.value;
                        let timeStamp = moment(value).unix()
                        formik.setFieldValue("tokenClaimTime", value);
                        formik.setFieldValue("tokenClaimTimeTimestamp", timeStamp);
                    }}
                    min={moment(formik.values.endTime).format("YYYY-MM-DDTHH:mm")}
                    onBlur={formik.handleBlur}
                    value={formik.values.tokenClaimTime}
                />
            </div>
        </div>
    )
}

export default ListSTOTimeline
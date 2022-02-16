import { FC } from "react";
import TimerButton from "./atom/TimerButton";
import { Grid, Dialog, DialogTitle, DialogContent } from "@material-ui/core";

interface ConfirmDialogProps {
    isOpen: boolean;
    close(): void;
    onConfirm(): void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
    const onConfirm = () => {
        props.onConfirm();
        props.close();
    }
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            fullWidth={true}
        >
            <DialogTitle>時間計測を終了してよろしいですか？</DialogTitle>
            <DialogContent dividers={true}>
                <Grid container spacing={6} alignItems="center" justifyContent="center">
                    <Grid item>
                        <TimerButton buttonName="終了" func={onConfirm} />
                    </Grid>
                    <Grid item>
                        <TimerButton buttonName="キャンセル" func={props.close} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}
export default ConfirmDialog;
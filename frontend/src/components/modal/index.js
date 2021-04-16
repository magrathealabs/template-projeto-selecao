import React, { useState } from "react"
import { Modal } from "@material-ui/core"
import { ContainerModal } from "./styles"
import api from "../../services/api"
import { useTagsGitHub } from "../../hooks"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { toast } from "react-toastify"

function ModalButton({ tags, repo_id }) {
    const [visible, setVisible] = useState(false);
    const [tagID, setTagID] = useState(0);
    const { count, setCount } = useTagsGitHub();
    async function linkTagToRepository() {
        try {
            await api.post("/tags/repo", {
                repo_id, tag_id: tagID
            })
            setCount(count + 1)
            setTagID(0)
            setVisible(false)

        } catch (error) {
            toast.error('🦄' + error.response.data.detail, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
    }}
    function closeModal() {
        setVisible(!visible)
    }

    return (
        <div>
            <AddCircleIcon onClick={() => closeModal()} style={{
                color: "#3f51b5", fontSize: 30, cursor: "pointer",
            }} />
            <Modal onClose={closeModal} open={visible}>
                <ContainerModal>
                    <select value={tagID} onChange={(e) => setTagID(e.target.value)}>
                        <option value={0} disabled>
                            Choose a tag
                        </option>
                        {tags.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => linkTagToRepository()}>
                        Confirm
                    </button>
                </ContainerModal>
            </Modal>
        </div>
    )
}

export default ModalButton;
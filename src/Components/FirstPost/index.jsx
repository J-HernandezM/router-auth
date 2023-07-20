import styled from "@emotion/styled"
import { ButtonModal } from "../ButtonModal"

function FirstPost ({styles}) { 
    return(
            <ButtonModal type='add' styles={styles} >Create new post</ButtonModal>
    )
}
export { FirstPost }
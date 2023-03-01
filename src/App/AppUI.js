import React from "react";
import { Title } from '../title';
import { TableContainer } from '../tableContainer';
import { TableItems } from '../tableItems';
import { Scores } from '../scores';
import { CustomPopUp } from '../customPopUp';
import { GameContext } from '../GameContext';

function AppUI() {
    const { jugadas, play } = React.useContext(GameContext);
    return (
        <React.Fragment>

            <Title />

            <TableContainer>

                {jugadas.map(jugada => (
                    <TableItems
                        key={jugada.id}
                        value={jugada.value}
                        id={jugada.id}
                        onClick={() => play(jugada.id)}
                    />
                ))}

            </TableContainer>

            <Scores />

            <CustomPopUp />

        </React.Fragment>
    )
}
export { AppUI };
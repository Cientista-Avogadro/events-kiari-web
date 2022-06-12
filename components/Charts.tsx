import {Box, Text} from "@chakra-ui/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {Line} from "react-chartjs-2";
import {useSelector} from "react-redux";
import {IinitialProps} from "../store";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Relatório Semestral',
        },
    },
};


export const CustomChart = () => {
    const currentCard = useSelector((state: IinitialProps) => state.currentCard);

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Today",
                data: currentCard?.today,
                fill: true,
                borderColor: "rgba(75,192,192,0.1)",
                backgroundColor: "rgba(55, 81, 255, 0.1)"
            },
            {
                label: "Yesterday",
                data: currentCard?.yesterday,
                fill: true,
                borderColor: "#DFE0EB"
            }
        ]
    };
    return (
        <Box my={'30px'}>
            <Text color={'#252733'}>Venda de Ingressos</Text>
            <Line data={data} options={options}/>
        </Box>
    )

}
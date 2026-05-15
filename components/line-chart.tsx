import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { LineChart } from 'react-native-gifted-charts';


type Props = {
    data: any[];
};

export default function WeatherLineChart({ data }: Props) {
    const minTemp = Math.min(...data.map(d => d.value))
    const maxTemp = Math.max(...data.map(d => d.value))
    return (
        <View style={styles.lineChart}>
            <LineChart
                data={data}
                width={useWindowDimensions().width - 140}
                height={200}
                pointerConfig={{
                    activatePointersOnLongPress: true,
                    pointerStripHeight: 190,
                    pointerLabelComponent: (items: { value: string }[]) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: "#333",
                                    paddingVertical: 6,
                                    borderRadius: 8,
                                    width: 40,
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 10,
                                    }}
                                >
                                    {items[0].value}°C
                                </Text>
                            </View>
                        );
                    },
                }}
                curved
                nestedScrollEnabled
                areaChart
                hideRules

                yAxisOffset={minTemp - 5}
                adjustToWidth
                noOfSections={6}

                focusEnabled
                showStripOnFocus
                showTextOnFocus

                color="#FFFFFF"
                thickness={4}

                startFillColor="#FFFFFF"
                startOpacity={0.3}
                endOpacity={0}

                dataPointsColor="#FFFFFF"
                dataPointsRadius={5}

                initialSpacing={25}
                spacing={60}
                endSpacing={10}

                yAxisLabelWidth={30}

                xAxisLabelTextStyle={{ color: "#E5E7EB", fontSize: 12 }}

                yAxisTextStyle={{ color: "#E5E7EB", fontSize: 12 }}

                xAxisThickness={0}
                yAxisThickness={0}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    lineChart: {
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 5,
        paddingTop: 10,
        paddingBottom: 30,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1,
        padding: 6,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
})
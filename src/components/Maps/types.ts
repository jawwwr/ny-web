export interface MapInterface {
    id: number,
    myLocation: string,
    restauranLocation: string
}

export interface MapsIProps {
    map?: MapInterface
    error?: string | object
}
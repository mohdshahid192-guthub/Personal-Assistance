interface HistoryElements {
  title: string
}

export default function HistoryElements ({title}: HistoryElements) {
  return(
    <p className="w-full px-3 py-2 font-semibold text-gray-200 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors text-ellipsis whitespace-nowrap cursor-pointer overflow-hidden ">{title}</p>
  )
}
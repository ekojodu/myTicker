export function LoadingSkeleton(){
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-24 bg-slate-200 rounded-xl"/>
            <div className="h-64 bg-slate-200 rounded-xl"/>
            <div className="h-48 bg-slate-200 rounded-xl"/>
        </div>
    )
}
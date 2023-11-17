
import ChatComponent from '@/app/_components/chatbox';


const analizer = () => {



    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="bg-slate-800 p-3 w-[800px] rounded-md text-white">
                <ChatComponent />
            </div>
        </main>
    )
}

export default analizer;
import { Github, Linkedin, Facebook, Instagram, Twitter, X } from 'lucide-react'

const Socials = () => {
    return (
        <div className="fixed flex flex-col left-5 h-screen items-center align-middle z-10 justify-center gap-6 max-xl:hidden">
            <a
                href="https://github.com/luniostudios"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <Github className="w-5 h-5 text-white" />
            </a>
            <a
                href="https://www.linkedin.com/company/luniostudios/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a
                href="https://www.facebook.com/profile.php?id=61575845991065"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
                href="https://www.instagram.com/lunio_studios/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
                href="https://x.com/LUNIOStudios"
                target="_blank"
                rel="noopener noreferrer"
                title="X"
                className="p-2 rounded-full bg-black hover:bg-linear-to-r hover:from-stone-300/20 hover:to-stone-500/20 border border-stone-300/10 hover:border-stone-500/50 transition-all duration-300 hover:scale-110"
            >
                <X className="w-5 h-5 text-white" />
            </a>
        </div>
    )
}

export default Socials
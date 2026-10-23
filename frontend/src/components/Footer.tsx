export default function Footer() {
  return (
    <>
      <footer className="bg-card-bg text-slate-400 mt-auto border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                  <div className="md:col-span-2 space-y-4">
                      <a href="#" className="flex items-center gap-3">
                          <div className="bg-brand-header px-3 py-1.5 rounded-lg border border-slate-700">
                              <span className="font-p2p text-lg text-white">H<span className="text-light-blue">i</span>L<span className="text-light-blue">O</span></span>
                          </div>
                          <span className="font-mono tracking-widest text-light-blue uppercase font-bold">HIGH / LOWER</span>
                      </a>
                      <small className="text-xs text-slate-400 max-w-sm leading-relaxed">
                          A competitive, logic-driven number game designed specifically for computational thinkers, math enthusiasts, and algorithm geeks worldwide.
                      </small>
                      <div className="flex gap-4 text-slate-400 ">
                          <a href="#" className="hover:text-light-blue transition-colors"><i className="fa-brands fa-github"></i></a>
                          <a href="#" className="hover:text-light-blue transition-colors"><i className="fa-brands fa-discord"></i></a>
                          <a href="#" className="hover:text-light-blue transition-colors"><i className="fa-brands fa-x-twitter"></i></a>
                      </div>
                  </div>

                  <div>
                      <p className="text-white font-mono text-xs uppercase font-bold tracking-wider mb-4">Quick Links</p>
                      <ul className="space-y-2 text-xs">
                          <li><a href="#features" className="hover:text-light-blue transition-colors">Game Features</a></li>
                          <li><a href="#demo-game" className="hover:text-light-blue transition-colors">Play Sandbox Demo</a></li>
                          <li><a href="#leaderboard" className="hover:text-light-blue transition-colors">Global Leaderboards</a></li>
                          <li><a href="#" className="hover:text-light-blue transition-colors">Account Login</a></li>
                      </ul>
                  </div>

                  <div>
                      <p className="text-white font-mono text-xs uppercase font-bold tracking-wider mb-4">Support</p>
                      <ul className="space-y-2 text-xs">
                          <li><button className="hover:text-light-blue transition-colors">Contact Support</button></li>
                          <li><a href="#faq" className="hover:text-light-blue transition-colors">Help Center / FAQ</a></li>
                          <li><a href="#" className="hover:text-light-blue transition-colors">Privacy Policy</a></li>
                          <li><a href="#" className="hover:text-light-blue transition-colors">Terms of Service</a></li>
                      </ul>
                  </div>

              </div>

              <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-mono gap-4">
                  <div>&copy; 2026 HiLo Game Engine. Built for Number Geeks.</div>
              </div>
          </div>
      </footer>
    </>
  )
}
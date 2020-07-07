import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'chats', loadChildren: () => import('./chat-list/chat-list.module').then( m => m.ChatListPageModule) },
  { path: 'textchat', loadChildren: () => import('./textchat/textchat.module').then( m => m.TextchatPageModule) },
  { path: 'search', loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule) },
  { path: 'matching', loadChildren: () => import('./matching/matching.module').then( m => m.MatchingPageModule) },
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
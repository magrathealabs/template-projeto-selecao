﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace gerenciador_hashtags_twitter.Application.Properties {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class Resources {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("gerenciador_hashtags_twitter.Application.Properties.Resources", typeof(Resources).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Already exists an user with this username..
        /// </summary>
        internal static string AlreadyExistsUsersWithThisUsername {
            get {
                return ResourceManager.GetString("AlreadyExistsUsersWithThisUsername", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Already exists a hashtag with this name..
        /// </summary>
        internal static string ExistsHashtagWithThisName {
            get {
                return ResourceManager.GetString("ExistsHashtagWithThisName", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to There is no hashtag for the given id..
        /// </summary>
        internal static string HashtagDoesntExists {
            get {
                return ResourceManager.GetString("HashtagDoesntExists", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to There was an unespected erros when searching tweets in Twitter..
        /// </summary>
        internal static string UnexpectedErrorWhenSearchingTweets {
            get {
                return ResourceManager.GetString("UnexpectedErrorWhenSearchingTweets", resourceCulture);
            }
        }
    }
}
